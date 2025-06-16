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
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
            </select>
          </div>
          <div class="converter-arrow">→</div>
          <div class="currency-input">
            <input type="text" id="result" readonly placeholder="0.00">
            <select id="toCurrency">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CAD">CAD</option>
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
      
      result.value = converted;
      rateInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
      this.currentRate = rate;
    } catch (error) {
      console.error('Currency conversion error:', error);
      result.value = '';
      rateInfo.textContent = 'Conversion failed. Please try again.';
    }
  }
}
