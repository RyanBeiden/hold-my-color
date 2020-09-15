import PropTypes from 'prop-types';

const paletteShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { paletteShape };
