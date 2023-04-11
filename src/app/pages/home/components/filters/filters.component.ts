import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { StoreService } from "src/app/services/store.service";

@Component({
  selector: "app-filters",
  templateUrl: "filters.component.html",
  styles: [],
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() showCatagory = new EventEmitter<string>();
  categoriesSubscription!: Subscription;
  categories: Array<string> | undefined;
  constructor(private storeService: StoreService) {}
  onShowCategory(category: string): void {
    this.showCatagory.emit(category);
  }
  ngOnInit(): void {
    this.storeService.getAllCategories().subscribe((response) => {
      this.categories = response;
    });
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
