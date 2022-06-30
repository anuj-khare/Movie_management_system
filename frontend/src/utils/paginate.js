import _ from 'lodash';

export function paginate(items,pageNo,pageSize){
    const startIndex = (pageNo -1) * pageSize;


    //extract <<pagesize >> items from start index and return
    return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}