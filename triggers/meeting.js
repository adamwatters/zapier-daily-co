const listMeetings = z => {
  const promise = z.request("https://api.daily.co/v1/meetings");
  return promise.then(response =>
    response.json.data.map(d => {
      return {
        id: d.id,
        room: d.room,
        start_time: d.start_time,
        duration: d.duration
        // removing participants for now
      };
    })
  );
};

module.exports = {
  key: "meeting",
  noun: "Meeting",
  display: {
    label: "New Meeting",
    description: "Trigger when a new meeting occurs."
  },
  operation: {
    perform: listMeetings,
    sample: {
      id: "c182968d-cb3c-4aa0-8178-d5ac9ec5924b",
      room: "test",
      start_time: 1555699524,
      duration: 4780
    }
  }
};
