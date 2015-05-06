var convert = require('../');
var expect = require('expect.js');


describe('csl-convert', function(){

  describe('contributors', function(){
    it('ignores conversion', function(){
      var data = {author: [{given: 'foo', family: 'bar'}]};
      var res = convert(data);
      expect(res.author).to.have.length(1)
      expect(res.author[0].family).to.eql('bar')
      expect(res.author[0].given).to.eql('foo')
    })

    it('ignores multiple correctly', function(){
      var data = {
        author: [
          {given: 'foo', family: 'bar'},
          {given: 'boom', family: 'baz'}
        ]
      }
      var res = convert(data);
      expect(res.author).to.have.length(2)
      expect(res.author[0].family).to.eql('bar')
      expect(res.author[0].given).to.eql('foo')
      expect(res.author[1].family).to.eql('baz')
      expect(res.author[1].given).to.eql('boom')
    })

    it('ignores all contributors', function(){
      expect(convert({author: [{given:'f', family: 'l'}]})).to.have.key('author')
      expect(convert({collection_editor: [{given:'f', family: 'l'}]})).to.have.key('collection-editor')
      expect(convert({composer: [{given:'f', family: 'l'}]})).to.have.key('composer')
      expect(convert({source_author: [{given:'f', family: 'l'}]})).to.have.key('container-author')
      expect(convert({director: [{given:'f', family: 'l'}]})).to.have.key('director')
      expect(convert({managing_editor: [{given:'f', family: 'l'}]})).to.have.key('editorial-director')
      expect(convert({illustrator: [{given:'f', family: 'l'}]})).to.have.key('illustrator')
      expect(convert({interviewer: [{given:'f', family: 'l'}]})).to.have.key('interviewer')
      expect(convert({recipient_name: [{given:'f', family: 'l'}]})).to.have.key('recipient')
      expect(convert({review_author: [{given:'f', family: 'l'}]})).to.have.key('reviewed-author')
      expect(convert({translator: [{given:'f', family: 'l'}]})).to.have.key('translator')
    })
  })

  describe('dates', function(){
    it('converts year', function(){
      var data = {date_published: [{year: '2010'}]}
      var res = convert(data);
      expect(res.issued['date-parts'][0]).to.have.length(1)
      expect(res.issued['date-parts'][0][0]).eql('2010')
      expect(res.issued['date-parts'][0][1]).be(undefined)
      expect(res.issued['date-parts'][0][2]).be(undefined)

    })

    it('converts year/month', function(){
      var data = {date_published: [{year: '1991', month: '1'}]}
      var res = convert(data);
      expect(res.issued['date-parts'][0]).to.have.length(2)
      expect(res.issued['date-parts'][0][0]).eql('1991')
      expect(res.issued['date-parts'][0][1]).eql('1')
      expect(res.issued['date-parts'][0][2]).be(undefined)
    })

    it('converts year/month/day', function(){
      var data = {date_published: [{year: '1991', month: '10', day: '25' }]}
      var res = convert(data);
      expect(res.issued['date-parts'][0]).to.have.length(3)
      expect(res.issued['date-parts'][0][0]).eql('1991')
      expect(res.issued['date-parts'][0][1]).eql('10')
      expect(res.issued['date-parts'][0][2]).eql('25')
    })

    it('converts all dates', function(){
      expect(convert({date_accessed: [{}]})).to.have.key('accessed')
      expect(convert({event_date: [{}]})).to.have.key('event-date')
      expect(convert({date_published: [{}]})).to.have.key('issued')
      expect(convert({source_date_published: [{}]})).to.have.key('original-date')
    })
  })

  describe('strings', function(){
    it('converts correctly', function(){
      var data = {doi: [{content: 'foo bar'}]}
      var res = convert(data);
      expect(res.DOI).to.eql('foo bar')
    })
  })

  describe('numbers', function(){
    it('converts correctly', function(){
      var data = {volume: [{content: 3}]}
      var res = convert(data);
      expect(res.volume).to.eql(3)
    })
  })
})