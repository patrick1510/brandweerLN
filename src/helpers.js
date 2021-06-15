export class ConvertDateTime {
  constructor (datetime) {
    this.datetime = datetime;
  }
  NLtoISO() {
    const datetimeArr = this.datetime.split(' ');
    const date = datetimeArr[0].split('-').reverse().join('-');
    const time = datetimeArr[1];
    return date + 'T' + time;
  }
  ISOtoNL() {
    const datetimeArr = this.datetime.split('T');
    const date = datetimeArr[0].split('-').reverse().join('-');
    const time = datetimeArr[1].slice(0, -3);
    return date + ' ' + time;
  }
};
