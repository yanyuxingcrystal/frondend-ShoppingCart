import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserDialogComponent } from 'src/app/dialogs/user-dialog/user-dialog.component';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users !: User[];

  displayedColumns: string[] = ['email', 'passwordHash', 'isAdmin', 'edit', 'delete'];

  constructor(private userService: UsersService,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      }
    )
  }

  forwardToForm(id: string) {
    this.router.navigate(['/users/form/' + id])
  }

  deleteModal(user: User) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: { name: user.email },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        setTimeout(() => {
          this.userService.deleteUser(user._id).subscribe(
            (user) => {
              this.getAllUsers()
            })
        }
        )
      }
    })
  }
}
