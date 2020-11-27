/*
 * @Author: wupeiwen <javapeiwen2010@gmail.com>
 * @Date: 2020-11-27 09:16:27
 * @LastEditors: wupeiwen <javapeiwen2010@gmail.com>
 * @LastEditTime: 2020-11-27 09:54:21
 */
import Base from './base'
export default class Boundary extends Base {
  constructor (osm, boundary) {
    super(osm)
    let data
    if (boundary.dataType === 'geojson') {
      data = boundary.data
    } else if (boundary.dataType === 'json') {
      data = this.setFeatures(boundary.data)
    }
    this.config.sources['boundaryData'] = {
      'type': 'geojson',
      'data': data
    }
    this.config.layers.push({
      'id': 'boundary',
      'type': 'line',
      'source': 'boundaryData',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': boundary.color || '#888',
        'line-width': boundary.width || 3,
        'line-opacity': boundary.opacity || 0.8,
        // dotted solid
        'line-dasharray': boundary.type && boundary.type === 'solid' ? [10000] : [3, 1, 1, 1]
      }
    })
  }

  setFeatures (data) {
    const features = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': data
          }
        }
      ]
    }
    return features
  }
}
