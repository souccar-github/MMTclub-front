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
    CreateCategoryDto,
    CategoryServiceProxy,
    CategoryForDropdownDto,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";
import { L10n, setCulture, loadCldr } from "@syncfusion/ej2-base";
import {} from "@shared/service-proxies/service-proxies";
import { LocalizationHelper } from "@shared/localization/localization-helper";
import { initial } from "lodash-es";

setCulture("ar-SY");
L10n.load(LocalizationHelper.getArabicResources());

@Component({
    templateUrl: "create-category-dialog.component.html",
    styleUrls: ["create-category-dialog.component.scss"],
    providers: [CategoryServiceProxy],
})
export class CreateCategoryDialogComponent
    extends AppComponentBase
    implements OnInit
{
    saving = false;
    category: CreateCategoryDto = new CreateCategoryDto();
    categoriesForDropdown: CategoryForDropdownDto[] = [];
    public parentFields: Object = { text: "fullName", value: "id" };

    @Output() onSave = new EventEmitter<any>();

    constructor(
    injector: Injector,
    public _categoryService: CategoryServiceProxy,

    public dialogRef: NbDialogRef<CreateCategoryDialogComponent>
    ) {
    super(injector);
    loadCldr(
        require("cldr-data/main/ar-SY/numbers.json"),
        require("cldr-data/main/ar-SY/ca-gregorian.json"),
        require("cldr-data/supplemental/numberingSystems.json"),
        require("cldr-data/main/ar-SY/timeZoneNames.json"),
        require("cldr-data/supplemental/weekdata.json")
    );
    }

    ngOnInit(): void {
        this.initialParentCategories();
    }

    initialParentCategories(){
        this._categoryService.getAllForDropdown()
        .subscribe((result)=>{
            this.categoriesForDropdown = result;
        });
    }

    save(): void {
        this.saving = true;

        this._categoryService
        .create(this.category)
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
}
