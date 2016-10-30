var assert = chai.assert;

var map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: [ 0, 0 ],
        zoom: 2
    }),
    interactions: [],
    layers: [],
});

suite('Popup overlay', function () {
    test('Basic initialization', function () {
        var popup = new ol.PopupOverlay({
            content: '<div>Popup content</div>'
        });

        assert.ok(!!popup.getElement());
        assert.ok(popup.getElement().classList.contains('ol-popup'));
        assert.ok(popup.content.classList.contains('ol-popup-content'));
        assert.equal(popup.content.textContent, 'Popup content');
        assert.equal(popup.content.innerHTML, '<div>Popup content</div>');
    });

    test('Show / hide', function (done) {
        var beforeShowCalled = false;
        var beforeHideCalled = false;
        var showEventFired = false;
        var hideEventFired = false;
        var popup = new ol.PopupOverlay({
            position: [ 25, 25 ],
            content: '<div>Popup content</div>',
            autoPanAnimation: null,
            beforeShow: function () {
                beforeShowCalled = true;
            },
            beforeHide: function () {
                beforeHideCalled = true;
            }
        });

        popup.on('show', function() {
            showEventFired = true;
        });
        popup.on('hide', function () {
            hideEventFired = true;
        });

        map.addOverlay(popup);

        assert.deepEqual(popup.getPosition(), [ 25, 25 ]);

        popup.show([40, 35], '<div>New content</div>')
            .then(function () {
                assert.deepEqual(popup.getPosition(), [40, 35]);
                assert.equal(popup.content.innerHTML, '<div>New content</div>');
                assert.notEqual(popup.getElement().style.display, 'none');

                assert.ok(beforeShowCalled);
                assert.ok(showEventFired);

                return popup.hide();
            })
            .then(function() {
                assert.equal(popup.getElement().style.display, 'none');

                assert.ok(beforeHideCalled);
                assert.ok(hideEventFired);

                done();
            })
            .catch(done);
    });
});
