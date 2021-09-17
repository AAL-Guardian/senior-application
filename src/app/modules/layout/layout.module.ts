import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { SelectableButtonComponent } from './components/selectable-button/selectable-button.component';
import { WrapperTitleComponent } from './components/wrapper-title/wrapper-title.component';
import { WrapperBodyComponent } from './components/wrapper-body/wrapper-body.component';
import { WrapperFooterComponent } from './components/wrapper-footer/wrapper-footer.component';
import { TranslateModule } from '@ngx-translate/core';


const components = [
  HeaderComponent,
  WrapperComponent,
  SelectableButtonComponent,
  WrapperTitleComponent,
  WrapperBodyComponent,
  WrapperFooterComponent,
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    ...components
  ]
})
export class LayoutModule { }
