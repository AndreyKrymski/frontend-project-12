import * as filter from 'leo-profanity';

filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));
const filteredStr = (str) => filter.clean(str);
export default filteredStr;
