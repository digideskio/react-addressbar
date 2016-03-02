var addressbar = require('addressbar');
var React = require('react');
var URL = require('url-parse');

module.exports = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    replace: React.PropTypes.bool
  },
  componentWillMount: function () {
    addressbar.on('change', this.onUrlChange);
  },
  componentWillUnmount: function () {
    addressbar.removeListener('change', this.onUrlChange);
  },
  componentDidUpdate: function () {
    addressbar.value = {
      value: this.props.value,
      replace: !!this.props.replace
    };
  },
  componentDidMount: function () {
    addressbar.value = {
      value: this.props.value,
      replace: !!this.props.replace
    };
  },
  onUrlChange: function (event) {
    var url = event.target.value;
    if (this.props.onlyHash && url.indexOf('#') === -1) {
      return;
    }
    event.preventDefault();
    var urlObj = URL(url);
    var origin = urlObj.protocol + '//' + urlObj.host;
    this.props.onChange(url, {
      origin: origin,
      pathname: urlObj.pathname
    });
  },
  render: function () {
    return null;
  }
});
