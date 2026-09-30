/**
 * @jest-environment jsdom
 */
import { getGeoloc } from 'geo-locate';

describe('getGeoLoc runs as expected', () => {

    beforeEach(() => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve( {"country": "US", "is_eu": false, "app_region": "us1"} ),
            })
        );

        // set up window, localStorage mock
        window.document.url = 'localhost';
        window.Storage = true;
        window.localStorage.__proto__.getItem = jest.fn();
        window.localStorage.__proto__.setItem = jest.fn();
    });

    it('Should default US as the country and us1 as the region', () => {
        // run geo function 
        getGeoloc().then((loc) => {
          expect(loc.country).toBe('US');
          expect(loc.appRegion).toBe('us1');
          
          // make sure setItem is called
          expect(localStorage.setItem).toHaveBeenCalled();
        });

        // fetch was executed as well
        expect(fetch).toHaveBeenCalledWith(
            "https://corpsite-staging.datadoghq.com/locate"
        );
    });
});
