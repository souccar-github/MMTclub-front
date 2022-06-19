import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateProductSizeDto,
  ProductSizeServiceProxy,
  SizeDto,
  SizeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";
import { L10n, setCulture, loadCldr } from "@syncfusion/ej2-base";
import { LocalizationHelper } from "@shared/localization/localization-helper";
//import endTag

@Component({
  templateUrl: "create-productSize-dialog.component.html",
  styleUrls: ["create-productSize-dialog.component.scss"],
  providers: [ProductSizeServiceProxy],
})
export class CreateProductSizeDialogComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  productSize: CreateProductSizeDto = new CreateProductSizeDto();
  sizes: SizeDto[] = [];
  productId:number;
  public sizeFields: Object = { text: "name", value: "id" };
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _productSizeService: ProductSizeServiceProxy,
    public _sizeService: SizeServiceProxy,
    public dialogRef: NbDialogRef<CreateProductSizeDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.productSize.productId = this.productId;
    this.initialSize();
  }

  save(): void {
    
    this.saving = true;

    this._productSizeService
      .create(this.productSize)
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

  initialSize(){
    this._sizeService.getAll()
    .subscribe(result=>{
      this.sizes = result;
    })
  }
}
