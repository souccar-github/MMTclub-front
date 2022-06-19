import {
  Component,
  Inject,
  Injector,
  OnInit,
  Optional,
  ViewChild,
  ChangeDetectionStrategy,
} from "@angular/core";
import { NbDialogService } from "@nebular/theme";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { AppComponentBase } from "@shared/app-component-base";
import {
  API_BASE_URL,
  ProductSizeDto,
  ProductSizeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import {
  FilterSettingsModel,
  GridComponent,
  GroupSettingsModel,
  PageSettingsModel,
} from "@syncfusion/ej2-angular-grids";
import {
  DataManager,
  UrlAdaptor,
  Query,
  Predicate,
} from "@syncfusion/ej2-data";
import { finalize } from "rxjs/operators";
import { CreateProductSizeDialogComponent } from "./create-productSize/create-productSize-dialog.component";
import { EditProductSizeDialogComponent } from "./edit-productSize/edit-productSize-dialog.component";
import { L10n, setCulture } from "@syncfusion/ej2-base";
import { LocalizationHelper } from "@shared/localization/localization-helper";
import { ActivatedRoute, Router } from "@angular/router";

setCulture("ar-SY");
L10n.load(LocalizationHelper.getArabicResources());

@Component({
  selector: "app-productSize",
  templateUrl: "./productSize.component.html",
  styleUrls: ["./productSize.component.scss"],
  animations: [appModuleAnimation()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSizeComponent extends AppComponentBase implements OnInit {
  // Grid
  @ViewChild("productSizeGrid") public grid: GridComponent;
  public productSizes: DataManager;
  public param: Query;
  public pageSettings: PageSettingsModel;
  public pageSizes: number[] = [6, 20, 100];
  public groupOptions: GroupSettingsModel;
  public filterOption: FilterSettingsModel = { type: "Menu" };
  private baseUrl: string;
  localizationHelper: LocalizationHelper;
  public productId: string;
  public productName: string = "";

  constructor(
    injector: Injector,
    private _modalService: NbDialogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _productSizeAppService: ProductSizeServiceProxy,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    super(injector);
    this.baseUrl = baseUrl;
  }

  ngOnInit(): void {
    let routeData = history.state;
    this.productId = routeData.productId;
    this.productName = routeData.productName;
    
    if(this.productId == undefined)
    {
      this.navigateToProduct();
    }

    this.pageSettings = {
      pageSize: 6,
      pageCount: 10,
      pageSizes: this.pageSizes,
    };

    this.productSizes = new DataManager({
      url: this.baseUrl + "/api/services/app/ProductSize/Get",
      adaptor: new UrlAdaptor(),
    });
    this.param = new Query().addParams("id", this.productId);
  }
  showCreateDialog() {
    this._modalService
      .open(CreateProductSizeDialogComponent, {
        context: {
          productId: Number(this.productId),
        },
      })
      .onClose.subscribe((e: any) => {
        console.log("close:: " + e);
        this.refresh();
      });
  }
  showEditDialog(id) {
    this._modalService
      .open(EditProductSizeDialogComponent, {
        context: {
          id: id,
        },
      })
      .onClose.subscribe((e: any) => {
        console.log("close:: " + e);
        this.refresh();
      });
  }

  delete(data): void {
    abp.message.confirm(
      this.l("DoYouWantToRemoveTheProductSize", data.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._productSizeAppService
            .delete(data.id)
            .pipe(
              finalize(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  
  refresh() {
    this.grid.refresh();
  }
  clearFilters() {
    this.grid.clearFiltering();
  }
  clearSorts() {
    this.grid.clearSorting();
  }

  navigateToProduct() {
    this._router.navigateByUrl("/app/setting/product");
  }
  navigateToCourses(data) {
    this._router.navigateByUrl("/app/setting/course", {
      state: {
        ProductSizeId: data.id,
        productId: this.productId,
        ProductSizeName: data.name,
        productName: this.productName,
      },
    });
  }
}
