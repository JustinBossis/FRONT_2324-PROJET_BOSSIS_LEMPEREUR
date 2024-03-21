import { TestBed } from '@angular/core/testing';

import { ChatDetailResolverService } from './chat-detail-resolver.service';

describe('ChatDetailResolverService', () => {
  let service: ChatDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
