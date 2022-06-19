import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateProductDto,
  ProductServiceProxy,
  ProductSizeServiceProxy,
  CreateProductSizeDto,
  CategoryDto,
  CategoryServiceProxy,
  CategoryForDropdownDto,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";
import {
  EditSettingsModel,
  GridComponent,
  PageSettingsModel,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";
import { initial } from "lodash-es";

@Component({
  templateUrl: "create-product-dialog.component.html",
  styleUrls: ["create-product-dialog.component.scss"],
  providers: [ProductServiceProxy],
})
export class CreateProductDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  product: CreateProductDto = new CreateProductDto();
  ProductSizes: CreateProductSizeDto[] = [];
  forHim: boolean = false;
  @Output() onSave = new EventEmitter<any>();

  //ProductSize
  @ViewChild("ProductSizeGrid") public grid: GridComponent;
  public pageSizes: number[] = [5,10, 20, 100];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  categories: CategoryForDropdownDto[] = [];
  public categoryFields: Object = { text: "name", value: "id" };
  
  constructor(
    injector: Injector,
    public _productService: ProductServiceProxy,
    private _categoryAppService: CategoryServiceProxy,
    public _ProductSizeService: ProductSizeServiceProxy,
    public dialogRef: NbDialogRef<CreateProductDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialCategories();
    if (this.product.productSizes == undefined) {
      this.product.productSizes = [];
    }

    this.pageSettings = {
      pageSize: 5,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };
    this.editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true, mode: "Normal" };
    this.toolbar = ["Add", "Edit","Delete", "Update", "Cancel","Search"];
  }

  initialCategories(){
    this._categoryAppService.getAllForDropdown()
    .subscribe((result)=>{
        this.categories = result;
    });
}

  save(): void {
    this.initialProductSize();
    this.product.productSizes = this.ProductSizes;
    this.saving = true;
    this._productService
      .create(this.product)
      .pipe(
        finalize(() => {
          this.saving = false;
        })
      )
      .subscribe(() => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.dialogRef.close();
        this.onSave.emit();
      });
  }

  initialProductSize(){
    this.ProductSizes.forEach(ProductSize => {
      ProductSize.id = 0;
    });
  }
  
  actionComplete(args) {
    if (args.requestType === "save") {
      console.log(this.product.productSizes);
    }
  }

  actionBegin(args: SaveEventArgs): void {
    
    if (args.requestType === "add") {
      console.log("add");
    }
    if (args.requestType === "beginEdit") {
      console.log("beginEdit");
    }
  }
}
