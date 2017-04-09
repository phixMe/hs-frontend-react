/**
 * Created by phix on 4/8/17.
 */

import React from 'react';
import styles from './top_sales_list_item.scss';

class TopSalesListItem extends React.Component {

    render() {
        let sale = this.props.sale;
        let index = this.props.index;
        let currency = '$' + sale.revenue.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        return (
            <li className={styles.vAlignParent}>
                <span className={styles.circle}>{index+1}</span>
                <div className={styles.vAlign}>
                    <div className={styles.title}>{sale.name}</div>
                    <div className={styles.subTitle}>{currency}</div>
                </div>
            </li>
        )
    }
}

export default TopSalesListItem;
