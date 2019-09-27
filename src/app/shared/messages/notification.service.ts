import { Subject } from "rxjs/Subject";

export class NotificationService {
    // private notifier = new EventEmitter<string>()
    private subject = new Subject<string>()
    public notifier = this.subject.asObservable()

    notify(message: string) {
        //this.notifier.emit(message)
        this.subject.next(message)
    }
}