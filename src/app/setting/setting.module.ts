import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeModule } from '@theme/theme.module';
import { CommonModule } from '@angular/common';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SizeComponent } from './size/size.component';
import { CreateSizeDialogComponent } from './size/create-size/create-size-dialog.component';
import { EditSizeDialogComponent } from './size/edit-size/edit-size-dialog.component';
import { CategoryComponent } from './category/category.component';
import { CreateCategoryDialogComponent } from './category/create-category/create-category-dialog.component';
import { EditCategoryDialogComponent } from './category/edit-category/edit-category-dialog.component';
import { ProductSizeComponent } from './productSize/productSize.component';
import { CreateProductSizeDialogComponent } from './productSize/create-productSize/create-productSize-dialog.component';
import { EditProductSizeDialogComponent } from './productSize/edit-productSize/edit-productSize-dialog.component';
import { ProductComponent } from './product/product.component';
import { CreateProductDialogComponent } from './product/create-product/create-product-dialog.component';
import { EditProductDialogComponent } from './product/edit-product/edit-product-dialog.component';


//import endTage
import {
    NbActionsModule,
    NbAlertModule,
    NbButtonModule,
    NbCardModule,
    NbDialogModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    NbSelectModule
} from '@nebular/theme';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
    EditService,
    FilterService,
    ForeignKeyService,
    GridModule,
    GroupService,
    PageService,
    SortService,
    ToolbarService
} from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxModule, UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ButtonModule, SwitchModule } from '@syncfusion/ej2-angular-buttons';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CategoryServiceProxy, ProductServiceProxy, ProductSizeServiceProxy, SizeServiceProxy } from '@shared/service-proxies/service-proxies';




const NB_MODULES = [
    NbActionsModule,
    NbIconModule,
    NbEvaIconsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbAlertModule,
    NbCheckboxModule
];
const SYNCFUSION_MODULES = [
    GridModule,
    ToolbarModule,
    UploaderModule,
    NumericTextBoxModule,
    DropDownListModule,
    SwitchModule,
    ButtonModule
];

const SYNCFUSION_SERVICES = [
    PageService,
    SortService,
    FilterService,
    GroupService,
    ToolbarService,
    ForeignKeyService,
    EditService
];

@NgModule({
    declarations: [
        SettingComponent,
        SizeComponent,
        CreateSizeDialogComponent,
        EditSizeDialogComponent,

        CategoryComponent,
        CreateCategoryDialogComponent,
        EditCategoryDialogComponent,

        ProductSizeComponent,
        CreateProductSizeDialogComponent,
        EditProductSizeDialogComponent,

        ProductComponent,
        CreateProductDialogComponent,
        EditProductDialogComponent,
        //declare endTage
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        SharedModule,
        ServiceProxyModule,
        ThemeModule,
        SettingRoutingModule,
        ...SYNCFUSION_MODULES,
        ...NB_MODULES
    ],
    providers: [
        ...SYNCFUSION_SERVICES,
		ProductServiceProxy,
		CategoryServiceProxy,
        SizeServiceProxy,
        ProductSizeServiceProxy,
        //Service proxy endTage

    ],
    entryComponents: [

    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingModule { }
