module.exports = {
  run: function (data) {
    date = data.split("/");
    isoDate = date[2]+'-'+date[0]+'-'+date[1]+'T00:00:00.000Z';
    return isoDate;
  }
}
