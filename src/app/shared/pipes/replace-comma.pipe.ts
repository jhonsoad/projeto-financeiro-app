import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceComma',
  standalone: true
})
export class ReplaceCommaPipe implements PipeTransform {
  transform(value: string | number): string {
    if (typeof value === 'number') {
      value = value.toString();
    }
    return value.replace('.', ',');
  }//pipe customizado simples (replaceComma) para substituir o ponto pela vírgula, uma vez que o pipe number padrão usa o ponto como separador decimal
}