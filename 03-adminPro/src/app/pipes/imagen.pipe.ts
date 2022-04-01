import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';
const baseURL = environment.base_url;
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {
    if (!img) {
      return `${baseURL}/uploads/usuarios/noImagen`;
    } else if (img?.includes('https')) {
      return img;
    } else if (img) {
      return `${baseURL}/uploads/${tipo}/${img}`;
    } else {
      return `${baseURL}/uploads/usuarios/noImagen`;
    }
  }

}
