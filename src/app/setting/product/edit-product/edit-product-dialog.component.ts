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
import { NbDialogRef } from "@nebular/theme";
import {
  ProductSizeServiceProxy,
  CategoryDto,
  CategoryServiceProxy,
  UpdateProductDto,
  UpdateProductSizeDto,
  ProductServiceProxy,
} from "@shared/service-proxies/service-proxies";
import {
  EditSettingsModel,
  GridComponent,
  PageSettingsModel,
  SaveEventArgs,
  ToolbarItems,
} from "@syncfusion/ej2-angular-grids";

@Component({
  templateUrl: "edit-product-dialog.component.html",
  styleUrls: ["edit-product-dialog.component.scss"],
})
export class EditProductDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  id: number;
  product: UpdateProductDto = new UpdateProductDto();
  ProductSizes: UpdateProductSizeDto[] = [];
  forHim: boolean = false;
  @Output() onSave = new EventEmitter<any>();

  //ProductSize
  @ViewChild("ProductSizeGrid") public grid: GridComponent;
  public pageSizes: number[] = [5, 10, 20, 100];
  public pageSettings: PageSettingsModel;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  categories: CategoryDto[] = [];
  public categoryFields: Object = { text: "name", value: "id" };

  constructor(
    injector: Injector,
    public _productService: ProductServiceProxy,
    private _categoryAppService: CategoryServiceProxy,
    public _ProductSizeService: ProductSizeServiceProxy,
    public dialogRef: NbDialogRef<EditProductDialogComponent>
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
    this.editSettings = {
      allowAdding: true,
      allowEditing: true,
      allowDeleting: true,
      mode: "Normal",
    };
    this.toolbar = ["Add", "Edit", "Delete", "Update", "Cancel", "Search"];
  }

  initialProductSize() {
    this.ProductSizes.forEach((ProductSize) => {
      ProductSize.id = 0;
    });
  }

  initialCategories() {
    this._categoryAppService
      .getAll()
      .subscribe((result) => {
        this.categories = result;
        this.initialProduct();
      });
  }

  initialProduct(){
    this._productService
    .getForEdit(this.id)
    .subscribe((result: UpdateProductDto) => {
      this.product = result;
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

  save(): void {
    this.saving = true;

    this._productService
        .update(this.product)
        .pipe(
            finalize(() => {
                this.saving = false;
            })
        )
        .subscribe(() => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.dialogRef.close();
            this.onSave.emit();
        });
}
}
