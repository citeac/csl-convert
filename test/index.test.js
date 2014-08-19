var convert = require('../');
var expect = require('expect.js');


describe('csl-convert', function(){

  describe('contributors', function(){
    it('converts single correctly', function(){
      var data = [{type: 'author', first: 'foo', last: 'bar' }]
      var res = convert(data);
      expect(res.author).to.have.length(1)
      expect(res.author[0].family).to.eql('bar')
      expect(res.author[0].given).to.eql('foo')
    })

    it('converts multiple correctly', function(){
      var data = [
        {type: 'author', first: 'foo', last: 'bar' },
        {type: 'author', first: 'boom', last: 'baz' },
      ]
      var res = convert(data);
      expect(res.author).to.have.length(2)
      expect(res.author[0].family).to.eql('bar')
      expect(res.author[0].given).to.eql('foo')
      expect(res.author[1].family).to.eql('baz')
      expect(res.author[1].given).to.eql('boom')
    })

    it('converts all contributors', function(){
      expect(convert([{type: 'author', first:'f', last: 'l'}])).to.have.key('author')
      expect(convert([{type: 'collectionEditor', first:'f', last: 'l'}])).to.have.key('collection-editor')
      expect(convert([{type: 'composer', first:'f', last: 'l'}])).to.have.key('composer')
      expect(convert([{type: 'sourceAuthor', first:'f', last: 'l'}])).to.have.key('container-author')
      expect(convert([{type: 'director', first:'f', last: 'l'}])).to.have.key('director')
      expect(convert([{type: 'managingEditor', first:'f', last: 'l'}])).to.have.key('editorial-director')
      expect(convert([{type: 'illustrator', first:'f', last: 'l'}])).to.have.key('illustrator')
      expect(convert([{type: 'interviewer', first:'f', last: 'l'}])).to.have.key('interviewer')
      expect(convert([{type: 'recipientName', first:'f', last: 'l'}])).to.have.key('recipient')
      expect(convert([{type: 'reviewAuthor', first:'f', last: 'l'}])).to.have.key('reviewed-author')
      expect(convert([{type: 'translator', first:'f', last: 'l'}])).to.have.key('translator')
    })
  })

  describe('dates', function(){
    it('converts year', function(){
      var data = [{type: 'datePublished', year: '2010'}]
      var res = convert(data);
      expect(res.issued['date-parts'][0]).to.have.length(1)
      expect(res.issued['date-parts'][0][0]).eql('2010')
    })

    it('converts year/month', function(){
      var data = [{type: 'datePublished', year: '1991', month: '0' }]
      var res = convert(data);
      expect(res.issued['date-parts'][0]).to.have.length(2)
      expect(res.issued['date-parts'][0][0]).eql('1991')
      expect(res.issued['date-parts'][0][1]).eql('1')
    })

    it('converts year/month/day', function(){
      var data = [{type: 'datePublished', year: '1991', month: '9', day: '25' }]
      var res = convert(data);
      expect(res.issued['date-parts'][0]).to.have.length(3)
      expect(res.issued['date-parts'][0][0]).eql('1991')
      expect(res.issued['date-parts'][0][1]).eql('10')
      expect(res.issued['date-parts'][0][2]).eql('25')
    })

    it('converts all dates', function(){
      expect(convert([{type: 'dateAccessed'}])).to.have.key('accessed')
      expect(convert([{type: 'eventDate'}])).to.have.key('event-date')
      expect(convert([{type: 'datePublished'}])).to.have.key('issued')
      expect(convert([{type: 'sourceDatePublished'}])).to.have.key('original-date')
    })
  })

  describe('strings', function(){
    it('converts correctly', function(){
      var data = [{type: 'doi', content: 'foo bar'}]
      var res = convert(data);
      expect(res.DOI).to.eql('foo bar')
    })
  })

  describe('numbers', function(){
    it('converts correctly', function(){
      var data = [{type: 'volume', content: 3}]
      var res = convert(data);
      expect(res.volume).to.eql(3)
    })
  })
})