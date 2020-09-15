import React from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  Typography,
  CardContent,
  Divider,
  Box,
} from '@material-ui/core';

import paletteShape from '../../../helpers/props/paletteShape';
import colorData from '../../../helpers/data/colorData';

import './PaletteCard.scss';

class PaletteCard extends React.Component {
  state = {
    colorsToPreview: [],
  }

  static propTypes = {
    palette: paletteShape.paletteShape,
  }

  componentDidMount() {
    this.getColorPreview();
  }

  getColorPreview = () => {
    const { palette } = this.props;
    colorData.getColorsByPaletteId(palette.id)
      .then((response) => {
        const newColorArray = [];
        response.forEach((res) => {
          const oneColor = res.code;
          newColorArray.push(oneColor);
          this.setState({ colorsToPreview: newColorArray });
        });
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { colorsToPreview } = this.state;
    const { palette } = this.props;

    const paletteLink = `/palettes/${palette.id}`;
    const colorPreviews = colorsToPreview.map((colorCode) => <div
      className="CardPalette__preview"
      style={{ backgroundColor: colorCode }}
      key={colorCode}
    ></div>);

    return (
      <Card className="PaletteCard">
          <CardActionArea className="PaletteCard__action">
            <Link to={paletteLink} className="CardPalette__link">
              <CardContent>
                <Typography gutterBottom variant="h5" component="h3">
                  {palette.name}
                </Typography>
                <Divider />
                <Box display="flex" justifyContent="center">
                  {colorPreviews}
                </Box>
              </CardContent>
            </Link>
          </CardActionArea>
      </Card>
    );
  }
}

export default PaletteCard;
