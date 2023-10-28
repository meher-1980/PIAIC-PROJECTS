import * as readline from 'readline';
class Class {
    subject;
    time;
    room;
    constructor(subject, time, room) {
        this.subject = subject;
        this.time = time;
        this.room = room;
    }
}
class TeacherSchedule {
    classes = [];
    constructor() {
        this.promptUser();
    }
    addClass() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question('Enter subject: ', (subject) => {
            rl.question('Enter time: ', (time) => {
                rl.question('Enter room: ', (room) => {
                    const newClass = new Class(subject, time, room);
                    this.classes.push(newClass);
                    console.log('Class added to the schedule.');
                    rl.close();
                    this.promptUser();
                });
            });
        });
    }
    viewSchedule() {
        console.log('Teacher Schedule:');
        this.classes.forEach((c, index) => {
            console.log(`Class ${index + 1}: ${c.subject}, Time: ${c.time}, Room: ${c.room}`);
        });
        this.promptUser();
    }
    promptUser() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        console.log('\nTeacher Schedule Management');
        console.log('1. Add Class');
        console.log('2. View Schedule');
        console.log('3. Exit');
        rl.question('Enter your choice: ', (choice) => {
            switch (choice) {
                case '1':
                    this.addClass();
                    break;
                case '2':
                    this.viewSchedule();
                    break;
                case '3':
                    console.log('Thank you for using the Teacher Schedule program.');
                    rl.close();
                    process.exit(0);
                default:
                    console.log('Invalid choice. Please enter a valid option.');
                    rl.close();
                    this.promptUser();
            }
        });
    }
}
const schedule = new TeacherSchedule();
