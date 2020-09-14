import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
} from '@material-ui/core';

import paletteShape from '../../../helpers/props/paletteShape';

import './PaletteCard.scss';

class PaletteCard extends React.Component {
  static propTypes = {
    palette: paletteShape.paletteShape,
  }

  render() {
    const { palette } = this.props;
    const paletteLink = `/palettes/${palette.id}`;

    return (
      <Card className="PaletteCard">
          <CardActionArea className="PaletteCard__action">
            <Link to={paletteLink} className="CardPalette__link">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {palette.name}
                </Typography>
                <Divider />
                <Typography variant="body2" color="textSecondary" component="p">
                  Color Preview Here
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
      </Card>
    );
  }
}

export default PaletteCard;
