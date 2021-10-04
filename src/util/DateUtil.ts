import * as moment from 'moment';

export class DateUtil {
  public static ehHojeFimDeSemana():boolean {
    return DateUtil.ehFimDeSemana(moment());
  }

  public static ehFimDeSemana(data:any): boolean {
    const diaDaSemana = data.day();
    return diaDaSemana === 6 || diaDaSemana === 0;
  }

  public static proximaSegunda():any{
    return moment().startOf('isoWeek').add(1, 'week');
  }
}


