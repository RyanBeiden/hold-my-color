import PropTypes from 'prop-types';

const colorShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  paletteId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { colorShape };
