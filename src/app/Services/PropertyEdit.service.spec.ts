/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PropertyEditService } from './PropertyEdit.service';

describe('Service: PropertyEdit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyEditService]
    });
  });

  it('should ...', inject([PropertyEditService], (service: PropertyEditService) => {
    expect(service).toBeTruthy();
  }));
});
