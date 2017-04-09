import  {map, flatten, orderBy, uniqBy, filter, extend, first }  from 'lodash';

//transform data if needed here
export default function transformData(data, firstN) {

    //extract and flatten all of the products from all of the stores
    let revenues = _.map(_.flatten(_.map(data, function(stores){
            return stores.products
        })), function(product){
        return _.extend(product, {
            revenue: product.order_count * (product.vendor_price.value / product.vendor_price.scale)
        })
    });

    //get a list of the unique products in order to merge revenues of dups
    let unique = _.uniqBy(revenues, 'name');

    //merge the revenues of the duplicate products, note: other fields are not updated
    let mappedUnique = _.map(unique, function(unique){
        let copies = _.filter(revenues, { 'name': unique.name });
        let revenueSums = _.sumBy(copies, function(allProducts) { return allProducts.revenue; });
        //we are overwriting the old revenue properties
        return _.extend(unique, {revenue: revenueSums});
    });

    //sort the list by revenue, high to low
    let sorted = _.orderBy(mappedUnique, ['revenue'], ['desc']);

    //return the first N values as specified in the input parameters
    if (typeof firstN === 'number' && firstN <= sorted.length)
        return sorted.slice(0, firstN);
    return sorted;

};