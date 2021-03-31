// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    mutate(){
      let rng = Math.floor(Math.random() * 15);
      let base = this.dna[rng];
      let temp = returnRandBase();

      while (base === temp){
        //console.log(`Base: ${base} Temp: ${temp}`);
        temp = returnRandBase();
        //console.log(`Base: ${base} Temp: ${temp}`);
      };

      this.dna[rng] = temp;

      return this.dna;
    },
    compareDna(pObj){
      let count = 0;
      let percentage;

      for (let x = 0; x < pObj.dna.length; x++){
        //console.log(x);
        if (this.dna[x] === pObj.dna[x]){
          //console.log(`Match at ${x}`);
          count++;
        };
      };

      if (count > 0){
        percentage = ((count / 15) * 100);
      } else if (count <= 0){
        percentage = 0;
      };

      console.log(`Specimen ${this.specimenNum}: ${this.dna}`)
      console.log(`Specimen ${pObj.specimenNum}: ${pObj.dna}`)
      console.log(`The specimens have ${percentage}% DNA in common.`);
    },
    willLikelySurvive(){
      let count = 0;
      
      for (let x = 0; x < this.dna.length; x++){
        if (this.dna[x] === 'C' || this.dna[x] === 'G'){
          count++;
        };
      };

      if (((count/15) * 100) >= 60){  
        return true;
      } else {
        return false;
      };
    },
    complementStrand(){
      const complementaryArr = [];

      for (let x = 0; x < this.dna.length; x++){
        if (this.dna[x] === 'A'){
          complementaryArr.push('T')
        } else if (this.dna[x] === 'T'){
          complementaryArr.push('A');
        } else if (this.dna[x] === 'C'){
          complementaryArr.push('G');
        } else if (this.dna[x] === 'G'){
          complementaryArr.push('C');
        }
      };
      return complementaryArr;
    }
  };
};

const massProduce = () => {
  const arr = [];
  let survivor;
  let count = 0;

  while (count < 30){
    survivor = pAequorFactory((count + 1) ,mockUpStrand());

    if (survivor.willLikelySurvive()){
      arr.push(survivor);
      count++;
    };
  };
  return arr;
};

const checkMassSurvivability = arr => {
  for (let x = 0; x < 30; x++){
    console.log(arr[x].willLikelySurvive());
  };
};

let test1 = pAequorFactory(1, mockUpStrand());
//let test2 = pAequorFactory(2, mockUpStrand());

//console.log(`Pre: ${test.dna}`);
//console.log(`Post: ${test.mutate()}`);

//test1.compareDna(test2);

//console.log(test1.dna);
//console.log(test1.willLikelySurvive());

const arr = massProduce();

//checkMassSurvivability(arr);

console.log(test1.dna);
console.log(test1.complementStrand());
