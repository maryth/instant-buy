import React from "react";
import _ from "lodash";
import styles from "./style.css";
import algoliasearch from "algoliasearch";
import algoliasearchHelper from "algoliasearch-helper";
import Divider from 'material-ui/lib/divider';
import RaisedButton from 'material-ui/lib/raised-button';
import CheckBoxMenu from './CheckBoxMenu';
import SortBySelector from './SortBySelector';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import Item from './Item';

const sorts = {
    "Relevance": "relevance",
    "Price: Low to High": "price_asc",
    "Price: High to Low": "price_desc"
};

const BestBuySearch = React.createClass({

    onCategoriesChecked(checked, item) {
        checked ? this.state.algolia.addDisjunctiveFacetRefinement('categories', item)
            : this.state.algolia.removeDisjunctiveFacetRefinement('categories', item);
        this.callAlgolia();
    },
    onTypeChecked(checked, item) {
        checked ? this.state.algolia.addFacetRefinement('type', item)
            : this.state.algolia.removeFacetRefinement('type', item);
        this.callAlgolia();
    },
    onBrandChecked(checked, item) {
        checked ? this.state.algolia.addDisjunctiveFacetRefinement('brand', item)
            : this.state.algolia.removeDisjunctiveFacetRefinement('brand', item);
        this.callAlgolia();
    },
    onPriceRangeChecked(checked, item) {
        checked ? this.state.algolia.addDisjunctiveFacetRefinement('price_range', item)
            : this.state.algolia.removeDisjunctiveFacetRefinement('price_range', item);
        this.callAlgolia();
    },
    onSelectSort(sortType) {
        const indexName = "buy_" + sorts[sortType];
        this.state.algolia.setIndex(indexName);
        this.callAlgolia();
    },
    onPageChange(ev) {
        this.state.algolia.setPage(ev.selected);
        this.callAlgolia();
    },
    onSearch(ev) {
        this.state.algolia.setQuery(ev.target.value);
        this.callAlgolia();
    },
    callAlgolia(){
        this.state.algolia.search();
    },
    algoliaSearchDone(content){
        this.setState({shouldUpdate: true});
        this.setState({data: content});

        this.setState({'type': content.getFacetValues('type')});
        this.setState({'brands': content.getFacetValues('brand')});
        this.setState({'categories': content.getFacetValues('categories')});
        this.setState({'price_range': content.getFacetValues('price_range')});

        this.forceUpdate();
    },
    clearAll() {
        this.state.algolia.clearRefinements();
        this.state.algolia.setQuery("");
        this.setState({refreshValue: true});
        this.callAlgolia();
    },
    getInitialState() {
        const client = algoliasearch('XXX', 'XXX');
        const helper = algoliasearchHelper(
            client,
            'buy_relevance', {
                facets: ['type'],
                disjunctiveFacets: ['categories', 'brand', 'price_range'],
                hitsPerPage: 10,
                maxValuesPerFacet: 10
            }
        );
        helper.on('result', this.algoliaSearchDone);
        return {
            data: {
                "hits": [],
                "nbHits": 0,
                "page": 0,
                "nbPages": 5,
                "hitsPerPage": 10
            },
            shouldUpdate: false,
            refreshValue: false,
            algolia: helper
        };
    },
    componentDidMount(){
        this.callAlgolia();
    },
    componentDidUpdate(){
        this.setState({shouldUpdate: false});
        this.setState({refreshValue: false});
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return nextState.shouldUpdate;
    },
    render() {
        const items = this.state.data.hits.length > 0 ?
            this.state.data.hits.map(d =>
                <Item className={styles.item}
                      key={d.objectID}
                      item={d}
                />
            ) : <RaisedButton label="Clear Filters" primary={true} onClick={this.clearAll} className={styles.clear}
                              backgroundColor="#103D62"/>;

        const searchBar = this.state.refreshValue ?
            <SearchBar onChange={this.onSearch} value={""}/>
            :
            <SearchBar onChange={this.onSearch}/>;

        return (
            <div className={styles.container}>
                <div>
                    {searchBar}
                </div>
                <div className={styles.contentbuy}>

                    <div className={styles.menu}>
                        <p className={styles.number}>Filter By : </p>
                        <CheckBoxMenu title="Categories" items={this.state.categories}
                                      onChecked={this.onCategoriesChecked}/>
                        <CheckBoxMenu title="Brand" items={ this.state.brands}
                                      onChecked={this.onBrandChecked}/>
                        <CheckBoxMenu title="Type" items={ this.state.type}
                                      onChecked={this.onTypeChecked} customIcon={true}/>
                        <CheckBoxMenu title="Price Range" items={ this.state.price_range}
                                      onChecked={this.onPriceRangeChecked}/>

                    </div>

                    <div className={styles.items}>
                        <div className={styles.results}>
                            <p className={styles.number}>{this.state.data.nbHits} results found.</p>
                            <SortBySelector defaultCriteria={1} criterias={["Relevance", "Price: Low to High", "Price: High to Low"]}
                                            onChange={this.onSelectSort}/>
                        </div>
                        <div>
                            {items}
                        </div>
                    </div>

                </div>
                <div className={styles.footer}>
                    <Pagination currentPage={this.state.data.page}
                                totalPages={this.state.data.nbPages}
                                onPageChange={this.onPageChange}/>
                </div>
            </div>
        );
    }
});
export default BestBuySearch;
