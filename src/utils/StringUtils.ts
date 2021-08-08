import moment from "moment";
import 'moment/locale/ko';

export class StringUtils {
  static getRecentDate (created: string | undefined) {
    return (moment().subtract(1, 'days') < moment(created)) ?
      moment(created).fromNow() : moment(created).format('YYYY-MM-DD');
  }
}
