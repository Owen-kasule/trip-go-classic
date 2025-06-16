import { getRate } from '../services/rates.mjs';

export default class CurrencyConverter {
  constructor(parentSelector) {
    this.parent = document.querySelector(parentSelector);
    this.currentRate = null;
    this.render();
    this.bindEvents();
  }

  render() {
    this.parent.innerHTML = `
      <div class="currency-converter">
        <h3>💱 Currency Converter</h3>
        <div class="converter-controls">
          <div class="currency-input">
            <input type="number" id="amount" placeholder="100" value="100">
            <select id="fromCurrency">
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
          <div class="converter-arrow">→</div>
          <div class="currency-input">
            <input type="text" id="result" readonly placeholder="0.00">
            <select id="toCurrency">
              <option value="UGX">UGX - Ugandan Shilling</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="TZS">TZS - Tanzanian Shilling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>
        </div>
        <button id="convertBtn" class="btn-convert">Convert</button>
        <div id="rateInfo" class="rate-info"></div>
      </div>
    `;
  }

  bindEvents() {
    const convertBtn = this.parent.querySelector('#convertBtn');
    const amount = this.parent.querySelector('#amount');
    
    convertBtn.addEventListener('click', () => this.convert());
    amount.addEventListener('keyup', (e) => e.key === 'Enter' && this.convert());
  }

  async convert() {
    const amount = parseFloat(this.parent.querySelector('#amount').value);
    const from = this.parent.querySelector('#fromCurrency').value;
    const to = this.parent.querySelector('#toCurrency').value;
    const result = this.parent.querySelector('#result');
    const rateInfo = this.parent.querySelector('#rateInfo');

    if (!amount || amount <= 0) {
      result.value = '';
      rateInfo.textContent = 'Please enter a valid amount';
      return;
    }

    try {
      rateInfo.textContent = 'Converting...';
      const rate = await getRate(from, to);
      const converted = (amount * rate).toFixed(2);
      
      result.value = this.formatCurrency(converted, to);
      rateInfo.textContent = `1 ${from} = ${this.formatCurrency(rate, to)}`;
      this.currentRate = rate;
    } catch (error) {
      console.error('Currency conversion error:', error);
      result.value = '';
      rateInfo.textContent = 'Conversion failed. Please try again.';
    }
  }

  formatCurrency(amount, currency) {
    const num = parseFloat(amount);
    
    // Format large amounts (like UGX) with commas
    if (currency === 'UGX' || currency === 'TZS' || currency === 'KES') {
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: 0
      }).format(num);
    }
    
    // Format smaller amounts with 2-4 decimal places
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(num);
  }
}
