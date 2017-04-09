import React from 'react';
import transformData from '../utils/transformData.js'
import TopSalesListItem from './top-sales-list-item/top_sales_list_item.component.js'
import styles from './top_sales.scss';

class TopSalesList extends React.Component {

    constructor(props) {
        super();
        this.state = {sales: []};
    }

    componentWillMount() {
        this.state.sales = transformData(this.props.sales, 10);
    }

    render() {
        let sales = [];
        this.state.sales.forEach((sale, index) => {
            sales.push(<TopSalesListItem sale={sale} key={sale.name} index={index} />);
        });
        return (
            <div className={styles.panel}>
                <div className={styles.title}>Top Sales Items</div>
                <ul>
                    {sales}
                </ul>
            </div>
        );
    }
}

export default TopSalesList;