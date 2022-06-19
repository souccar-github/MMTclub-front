import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { SettingComponent } from "./setting.component";
import { CategoryComponent } from "./category/category.component";
import { SizeComponent } from "./size/size.component";
import { ProductSizeComponent } from "./productSize/productSize.component";
import { ProductComponent } from "./product/product.component";
//import endTage

const routes: Routes = [
    {
        path: "",
        component: SettingComponent,
        children: [
        {
            path: "size",
            component: SizeComponent,
            //data: { permission: "Page.Sizes" },
            canActivate: [AppRouteGuard],
        },

        {
            path: "category",
            component: CategoryComponent,
            data: { permission: "Pages.Categories" },
            canActivate: [AppRouteGuard],
        },

        {
            path: "product",
            component: ProductComponent,
            data: { permission: "Pages.Products" },
            canActivate: [AppRouteGuard],
        },

        {
            path: "product-ProductSize",
            component: ProductSizeComponent,
            //data: { permission: "Page.ProductSize" },
            canActivate: [AppRouteGuard],
        },
        //route endTage
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SettingRoutingModule {}
