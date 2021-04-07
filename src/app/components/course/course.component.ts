import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @ViewChild('btn', { read: ElementRef }) btn: ElementRef | undefined;

  // FOR SELF TEST
  title: string;
  observer: Observable<any>;
  subscription: Subscription;
  secondSubscription: Subscription;
  showButton: boolean;
  // FOR OPERATORS
  dataSource: Observable<number>;
  dataSourceSubs: Subscription;
  sourceArray: number[]

  constructor() {
    this.showButton = true;
    this.dataSource = of(1, 38, 13, 3, 23, 5, 25, 43, 2, 6, 14);
    this.sourceArray = [];
  }

  ngOnInit(): void {
    this.title = 'Curso RxJS';
    this.initializeButtonAction();
  }

  initializeButtonAction(): void {
    setTimeout(() => {
      this.setObserver(this.btn);
      this.setSubscription(this.observer);
      this.setSecondSubscription(this.observer);
      this.setDataSourceSubscription(this.dataSource);
      // this.mapDataSource();
      // this.setDataSourceSubscription(this.dataSource);
    }, 200);
  }

  setVisibilityOfComponent(): void {
    this.showButton = !this.showButton;
  }

  setObserver(btn: ElementRef | undefined): void {
    this.observer = fromEvent<any>(btn?.nativeElement, 'click');
  }

  setSubscription(observer: Observable<any>): void {
    this.subscription = observer.subscribe((event) => console.log(event));
  }

  setSecondSubscription(observer: Observable<any>): void {
    this.secondSubscription = observer.subscribe((event) => console.log(event));
  }

  setDataSourceSubscription(observer: Observable<number>): void {
    this.dataSourceSubs = observer
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe((num) => this.sourceArray.push(num));
  }

  mapDataSource(): void {

  }
}
