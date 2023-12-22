import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Note } from '../interfaces/note';
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes: Note[] = [];

  private noteSubject = new BehaviorSubject<Note[]>([]);


  private isEdit = new BehaviorSubject<boolean>(false);

  getEditable(){
    return this.isEdit.asObservable();

  }

  setEditable(value:boolean){
    this.isEdit.next(value)
  }

  constructor() {}

  getNotesObservable(): Observable<Note[]> {
    return this.noteSubject.asObservable();
  }

  updateNote(updatedNote: Note): void {
    const index = this.notes.findIndex((note)=> note.id=== updatedNote.id);

    if(index!== -1){
      this.notes[index] = updatedNote;
      this.noteSubject.next(this.notes);
    }
  }

  createNote(note: Note): void {
    note.id = new Date().getTime();
    this.notes.push(note);
    this.noteSubject.next(this.notes);
  }
  deleteNote(id: Number): void {
    this.notes = this.notes.filter((note) => note.id !== id);

    this.noteSubject.next(this.notes);
  }
}
