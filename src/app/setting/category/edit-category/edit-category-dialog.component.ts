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
  CategoryForDropdownDto,
    CategoryServiceProxy,
    UpdateCategoryDto,
} from "@shared/service-proxies/service-proxies";
import { NbDialogRef } from "@nebular/theme";

@Component({
    templateUrl: "edit-category-dialog.component.html",
    styleUrls: ["edit-category-dialog.component.scss"],
})
export class EditCategoryDialogComponent
    extends AppComponentBase
    implements OnInit
{
    saving = false;
    category: UpdateCategoryDto = new UpdateCategoryDto();
    id: number;

    categoriesForDropdown: CategoryForDropdownDto[] = [];
    public parentFields: Object = { text: "fullName", value: "id" };

    @Output() onSave = new EventEmitter<any>();

    constructor(
    injector: Injector,
    public _categoryService: CategoryServiceProxy,

    public dialogRef: NbDialogRef<EditCategoryDialogComponent>
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.initialParentCategories();
  }

  initialParentCategories(){
    this._categoryService.getAllForDropdown()
    .subscribe((result)=>{
        this.categoriesForDropdown = result;
        this.initialCategory();
    });
}

initialCategory(){
  this._categoryService
  .getForEdit(this.id)
  .subscribe((result: UpdateCategoryDto) => {
    this.category = result;
  });
}

  save(): void {
    this.saving = true;

    this._categoryService
      .update(this.category)
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
