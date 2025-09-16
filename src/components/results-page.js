import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { searchBox, pagination, refinementList, configure } from 'instantsearch.js/es/widgets';
import insights from 'search-insights';
// Import the connectHits connector
import { connectHits } from 'instantsearch.js/es/connectors';

// Import the hit template and a function to attach listeners
import resultHit, { attachEventListeners } from '../templates/result-hit';

class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  _registerClient() {
    this._searchClient = algoliasearch(
      process.env.ALGOLIA_APP_ID,
      process.env.ALGOLIA_API_KEY
    );

    insights('init', {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      userToken: 'user-12345',
    });

    this._searchInstance = instantsearch({
      indexName: process.env.ALGOLIA_INDEX,
      searchClient: this._searchClient,
      insights: true
    });
  }

  _registerWidgets() {
    // Create a custom render function for hits
    const renderHits = (renderOptions, isFirstRender) => {
      const { hits, widgetParams, results, sendEvent } = renderOptions;

      // This is where you render your hits to the DOM
      const hitsContainer = document.querySelector(widgetParams.container);
      hitsContainer.innerHTML = hits.map(hit => resultHit(hit, { sendEvent })).join('');

      // Attach event listeners after the DOM is updated
      hits.forEach(hit => {
        attachEventListeners(hit, sendEvent, results.queryID);
      });
    };

    // Create the custom hits widget using the connector
    const customHits = connectHits(renderHits);

    this._searchInstance.addWidgets([
      searchBox({
        container: '#searchbox',
      }),
      // Use your custom hits widget instead of the default one
      customHits({
        container: '#hits',
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      refinementList({
        container: '#categories-facet',
        attribute: 'categories',
      }),
      configure({
        clickAnalytics: true,
      }),
    ]);
  }

  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultPage;