import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListAdminComponent } from './item-list-admin.component';

describe('ItemListAdminComponent', () => {
  let component: ItemListAdminComponent;
  let fixture: ComponentFixture<ItemListAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemListAdminComponent]
    });
    fixture = TestBed.createComponent(ItemListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
