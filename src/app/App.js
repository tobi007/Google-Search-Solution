import React from 'react';
import './App.css';

import PopupPage from '../popup';
import NewTab from '../newtab';
import { localStorage } from '../helper/localStorageHelper'
import { chromeStorage } from '../helper/chrome'

const dataStore = process.env.REACT_APP_PROFILE === 'dev' ? localStorage : chromeStorage

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: [],
            filteredpages: [],
            searchLiteral: ''
        }
    }

    setPages = (pages) => {
        this.setState({
            pages: pages,
        }, () => {
            this.searchPages(this.state.searchLiteral);
            dataStore.setBadge(this.state.pages.length)
        })
    }

    componentDidMount() {
        dataStore.getObject('pages', this.setPages);
    }

    deletePage =(pageId) => {
        const newPageList = this.state.pages.filter(({ url }) => url !== pageId);
        dataStore.setObject('pages', newPageList, this.setPages);
    }

    addPage =(newPage) => {
        const newPageList = [...this.state.pages, newPage]
        dataStore.setObject('pages', newPageList, this.setPages);
    }

    searchPages = (searchLiteral) => {
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
