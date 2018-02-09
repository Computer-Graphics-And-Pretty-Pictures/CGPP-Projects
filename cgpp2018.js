$(document).ready(function() {

    $('#calendar').fullCalendar({
        events: [
            {
                title  : 'Collaboration and Exploration',
                start  : '2018-01-25T16:30:00',
                end : '2018-01-25T18:15:00',
                allday : false
            },
            {
                title  : 'Collaboration and Exploration 2',
                start  : '2018-02-01T16:30:00',
                end : '2018-02-01T18:15:00',
                allday : false
            },
            {
                title  : 'Collaboration and Exploration 3',
                start  : '2018-02-08T16:30:00',
                end : '2018-02-08T18:15:00',
                allday : false
            },
            {
                title  : 'Wormhole Traversals',
                start  : '2018-02-15T16:30:00',
                end : '2018-02-15T18:15:00',
                allday : false
            },
            {
                title  : 'D3 Workshop',
                start  : '2018-02-22T16:30:00',
                end : '2018-02-22T18:15:00',
                allday : false
            }
        ]
    });
});