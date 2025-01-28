import { Pipe, PipeTransform } from '@angular/core';
import { Property } from './model/property';

@Pipe({
  name: 'propertyFilter',
  standalone: true
})
export class PropertyFilterPipe implements PipeTransform {

  transform(properties: Property[], searchText: string): Property[] {
    if (!properties || !searchText) {
      return properties;
    }

    searchText = searchText.toLowerCase();
    return properties.filter(property =>
      property.address.toLowerCase().includes(searchText)
    );
  }

}
