jest.dontMock('../../renderer/components/sideMenu/sideMenu.js');

var React = require('react/addons');
var SideMenu = require('../../renderer/components/sideMenu/sideMenu.js');
var TestUtils = React.addons.TestUtils;

describe('SideMenu', function() {
  var SideMenuElement = TestUtils.renderIntoDocument(<SideMenu />);

  it('renders a SideMenu', function() {
    var items = TestUtils.scryRenderedDOMComponentsWithTag(SideMenuElement, 'li');
    expect(items.length).toEqual(3);
  });

  it('clicks the notes link', function() {
    var notebooksLink = TestUtils.findRenderedDOMComponentWithClass(SideMenuElement, 'Notebooks');
    TestUtils.Simulate.click(notebooksLink);
    expect(notebooksLink._owner.props.active).toBeTruthy();
  })
});
