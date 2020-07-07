import React from 'react';
import './App.css';

import PopupPage from '../popup';
import NewTab from '../newtab';
import { setObject, getObject } from '../helper/localStorageHelper'


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            filteredpages: []
        }
    }

    componentDidMount() {
        let localStoragePages = getObject('pages');
        if (localStoragePages === undefined || localStoragePages === null || localStoragePages.length === 0) {
            localStoragePages = []
        }  
        this.setState({
            pages: localStoragePages,
            filteredpages: localStoragePages
        })
        setObject('pages',localStoragePages)
    }

    deletePage =(pageId) => {
        const newPageList = this.state.pages.filter(({ url }) => url !== pageId);
        const newFilteredPageList = this.state.filteredpages.filter(({ url }) => url !== pageId);
        setObject('pages', newPageList);
        this.setState({
            pages: newPageList,
            filteredpages: newFilteredPageList
        })
    }

    addPage =(newPage) => {
        const newPageList = [...this.state.pages, newPage]
        setObject('pages', newPageList);
        this.setState({
            pages: newPageList,
        })
    }

    searchPages = (searchLiteral) => {
        console.log(searchLiteral)
        if (searchLiteral === '') {
            this.setState({
                filteredpages: this.state.pages,
            })
        } else {

            let newFilteredPageList = []
            this.state.pages.forEach(page => {
                if (
                    page.title.includes(searchLiteral) ||
                    page.comment.includes(searchLiteral) ||
                    page.url.includes(searchLiteral) ||
                    page.createdOn.includes(searchLiteral)
                ) {
                    newFilteredPageList.push(page)
                }
            });
           
            this.setState({
                filteredpages: newFilteredPageList,
            })
        }
    }

    render(){

        let url = window.location.href;
        console.log('URL: ', url)
        if (!url.includes('index-newtab.html')) {
            return (
                <PopupPage pages={this.state.pages} addPage={this.addPage} />
            );
        } else {
            return (
                <NewTab pages={this.state.filteredpages} deletePage={this.deletePage} searchPages={this.searchPages}/>
            );
        }
    }
}

export default App;
