import { inject, TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';


describe('ArticleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticleService]
    });
  });

  it('should be created', inject([ArticleService], (service: ArticleService) => {
    expect(service).toBeTruthy();
  }));
});
