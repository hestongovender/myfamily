import { Component, OnInit } from '@angular/core';
import { TreeModel } from '../../../../models/tree-model';
import { ProfileModel } from '../../../../models/profile-model';
import { AuthenticationService, MyFamilyApiService } from 'src/app/services';

@Component({
  selector: 'family-tree-graph',
  templateUrl: './family-tree-graph.component.html',
  styleUrls: ['./family-tree-graph.component.css']
})
export class FamilyTreeGraphComponent implements OnInit {
  userId: number;
  profileData: ProfileModel;
  tree: TreeModel;

  constructor(private authenticationService: AuthenticationService,
              private myFamilyApiService: MyFamilyApiService
  ) {
    this.profileData = this.authenticationService.currentUserValue;
    this.tree = new TreeModel();
  }

  ngOnInit() {
    this.userId = this.profileData.id;
    this.getFamilyTree(this.userId);
  }

  getFamilyTree(id) {
    this.myFamilyApiService.getFamilyTree(id).subscribe((data) => {
      console.log(data);
      this.tree = data as TreeModel;
      this.drawTree(this.tree);
    });
  }

  drawTree(treeData: TreeModel) {
    // canvas setup
    const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    canvas.style.position = 'relative';
    // canvas.style.position = 'fixed';
    // canvas.style.position = 'absolute';
    canvas.style.left = '0';
    canvas.style.top = '0';
    canvas.style.zIndex = '-1';

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    const canvasCentreHorizontal = canvasWidth / 2;
    const canvasCentreVertical = canvasHeight / 2;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // canvas content
    const defaultColour = 'black';
    const defaultTextSize = '20';
    const distance = 80;
    const squareWidth = distance;
    const rectWidth = distance * 2;
    const rectHeight = distance;
    const circleRadius = distance / 2;

    // shapes mid positions
    const userMidPosition = {x: canvasCentreHorizontal, y: canvasCentreVertical};
    const spouseMidPosition = {x: userMidPosition.x + distance * 2, y: userMidPosition.y};

    const childrenConnectorEndPosition = {x: (userMidPosition.x + spouseMidPosition.x) / 2, y: userMidPosition.y + distance};
    const childrenConnectorMidPosition = {x: (userMidPosition.x + spouseMidPosition.x) / 2, y: userMidPosition.y + distance};
    const childrenMidPosition = {x: (userMidPosition.x + spouseMidPosition.x) / 2, y: userMidPosition.y + distance * 2};

    const parentMidPosition = {x: userMidPosition.x - distance, y: userMidPosition.y - distance * 2.5};

    const siblingsConnectorStartPosition = {x: parentMidPosition.x, y: parentMidPosition.y + distance};
    const siblingsBusConnectorEndPosition = {x: siblingsConnectorStartPosition.x + distance / 2, y: siblingsConnectorStartPosition.y};

    // family tree members
    const userShape = getUserShape(treeData.personalDetails);
    userShape.label = new Text(treeData.personalDetails.firstname, userShape.midLeft, defaultTextSize , defaultColour);

    // Spouse
    let defaultSpouse = new ProfileModel();
    defaultSpouse.id = 0;
    defaultSpouse.firstname = 'Spouse';
    defaultSpouse.gender = treeData.personalDetails.gender === 'male' ? 'female' : 'male';

    let spouseProfile = treeData.spouse.length !== 0 ? treeData.spouse[0] : defaultSpouse;
    const spouseShape = getSpouseShape(spouseProfile);
    spouseShape.label = new Text(spouseProfile.firstname, spouseShape.midLeft, defaultTextSize, defaultColour);
    let spouseConnector = getSpouseConnector(userShape, spouseShape, defaultColour);

    // Children
    let defaultSon = new ProfileModel();
    defaultSon.id = 0;
    defaultSon.firstname = 'Son';
    defaultSon.gender = 'male';

    let defaultDaughter = new ProfileModel();
    defaultDaughter.id = 0;
    defaultDaughter.firstname = 'Daughter';
    defaultDaughter.gender = 'female';

    let childrenProfiles = treeData.children.length !== 0 ? treeData.children : [defaultSon, defaultDaughter];
    let childrenShapes = new Array();
    const childrenShapeStartPosition = determineShapeStartPosition(childrenMidPosition, childrenProfiles.length);
    let spouseChildrenBusConnector = new Line(spouseConnector.midPoint, childrenConnectorEndPosition, defaultColour);

    childrenProfiles.forEach(child => {
      const childShape = getShape(child, childrenShapeStartPosition[childrenProfiles.indexOf(child)]);
      childShape.label = new Text(child.firstname, childShape.midLeft, defaultTextSize, defaultColour);
      childShape.connector = new Line(childShape.midTop,
                                      {x: childShape.midTop.x, y: childrenConnectorEndPosition.y},
                                      defaultColour);
      childrenShapes.push(childShape);
    });
    let childrenBusLane = new Line({x: childrenShapes[0].center.x, y: childrenConnectorEndPosition.y},
                                   {x: childrenShapes[childrenShapes.length - 1].center.x, y: childrenConnectorEndPosition.y},
                                   defaultColour);

    // Parents
    let defaultFather = new ProfileModel();
    defaultFather.id = 0;
    defaultFather.firstname = 'Father';
    defaultFather.gender = 'male';

    let defaultMother = new ProfileModel();
    defaultMother.id = 0;
    defaultMother.firstname = 'Mother';
    defaultMother.gender = 'female';

    let parentProfiles = treeData.parents.length >= 2
                        ? treeData.parents
                        : [ treeData.parents[0] !== undefined ? treeData.parents[0] : defaultFather,
                            treeData.parents[1] !== undefined ? treeData.parents[1] : defaultMother
                        ];
    let parentShapes = new Array();
    const parentShapeStartPosition = determineShapeStartPosition(parentMidPosition, parentProfiles.length);
    parentProfiles.forEach(parent => {
      const parentShape = getShape(parent, parentShapeStartPosition[parentProfiles.indexOf(parent)]);
      parentShape.label = new Text(parent.firstname, parentShape.midLeft, defaultTextSize , defaultColour);
      parentShapes.push(parentShape);
    });
    let parentsConnector = getSpouseConnector(parentShapes[0], parentShapes[1], defaultColour);
    let parentsUserBusConnector = new Line(siblingsConnectorStartPosition, siblingsBusConnectorEndPosition, defaultColour);
    let parentsUserConnector = new Line(siblingsBusConnectorEndPosition, userShape.midTop, defaultColour);

    // Siblings
    let defaultBrother = new ProfileModel();
    defaultBrother.id = 0;
    defaultBrother.firstname = 'Brother';
    defaultBrother.gender = 'male';

    let defaultSister = new ProfileModel();
    defaultSister.id = 0;
    defaultSister.firstname = 'Sister';
    defaultSister.gender = 'female';

    let siblingProfiles = treeData.siblings.length !== 0 ? treeData.siblings : [defaultBrother, defaultSister];
    const siblingsBusConnectorStartPosition = {x: siblingsBusConnectorEndPosition.x - distance * siblingProfiles.length,
                                               y: siblingsBusConnectorEndPosition.y};
    const siblingsConnectorMidPosition = {x: siblingsConnectorStartPosition.x - distance * siblingProfiles.length,
                                          y: siblingsConnectorStartPosition.y};

    const siblingsEndPosition = {x: userMidPosition.x - distance * 2, y: userMidPosition.y};
    const siblingsMidPosition = {x: siblingsEndPosition.x - distance * siblingProfiles.length, y: siblingsEndPosition.y};

    let siblingsShapes = new Array();
    const siblingsShapeStartPosition = determineShapeStartPosition(siblingsMidPosition, siblingProfiles.length);
    let parentsSiblingsBusConnector = new Line(parentsConnector.midPoint, siblingsConnectorStartPosition, defaultColour);
    siblingProfiles.forEach(sibling => {
      const siblingShape = getShape(sibling, siblingsShapeStartPosition[siblingProfiles.indexOf(sibling)]);
      siblingShape.label = new Text(sibling.firstname, siblingShape.midLeft, defaultTextSize , defaultColour);
      siblingShape.connector = new Line(siblingShape.midTop,
                                        {x: siblingShape.midTop.x, y: siblingsConnectorStartPosition.y},
                                        defaultColour);
      siblingsShapes.push(siblingShape);
    });
    let siblingsBusLane = new Line({x: siblingsShapes[0].center.x, y: siblingsConnectorStartPosition.y},
                                    siblingsConnectorStartPosition,
                                    defaultColour);

    // internal canvas functions
    function getUserShape(profileData: ProfileModel) {
      if (profileData.gender === 'male') {
        return new Square({x: userMidPosition.x - distance / 2, y: userMidPosition.y - distance / 2},
                          squareWidth,
                          'blue');
      } else {
        return new Circle(userMidPosition,
                          circleRadius,
                          'red');
      }
    }

    function getSpouseShape(profileData: ProfileModel) {
      if (profileData.gender === 'male') {
        return new Square({x: spouseMidPosition.x - distance / 2, y: spouseMidPosition.y - distance / 2},
                          squareWidth,
                          profileData.id === 0 ? 'lightblue' : 'blue');
      } else {
        return new Circle(spouseMidPosition,
                          circleRadius,
                          profileData.id === 0 ? 'pink' : 'red');
      }
    }

    function getShape(profileData: ProfileModel, displayPosition) {

      if (profileData.gender === 'male') {
        return new Square({x: displayPosition.x, y: displayPosition.y - distance / 2},
                          squareWidth,
                          profileData.id === 0 ? 'lightblue' : 'blue');
      } else {
        return new Circle({x: displayPosition.x + distance / 2, y: displayPosition.y},
                          circleRadius,
                          profileData.id === 0 ? 'pink' : 'red');
      }
    }

    function determineShapeStartPosition(displayMidPosition, requiredDisplayPositions) {
      let shapeStartPosition = new Array();

      const numberOfShapes = requiredDisplayPositions;
      const numberOfSpaces = requiredDisplayPositions - 1;

      const xMid = displayMidPosition.x;
      const xStart = xMid - ((distance * numberOfShapes / 2) + (distance * numberOfSpaces / 2));
      // const xEnd = xMid + ((distance * numberOfShapes / 2) + (distance * numberOfSpaces / 2));

      // const centerPosition = {x: displayPosition.x, y: displayPosition.y};
      const displayStartPosition = {x: xStart, y: displayMidPosition.y};
      // const displayEndPosition = {x: , y: displayPosition.y};

      for (let index = 0; index < requiredDisplayPositions; index++) {
        shapeStartPosition.push({x: displayStartPosition.x + (2 * distance * index), y: displayStartPosition.y});
      }

      return shapeStartPosition;
    }

    function getSpouseConnector(spouse1, spouse2, colour) {
      return new Line(spouse1.midRight, spouse2.midLeft, colour);
    }

    function Line(startPosition, endPosition, colour: string) {
      this.startPosition = startPosition;
      this.endPosition = endPosition;
      this.colour = colour;

      this.left = startPosition;
      this.right = endPosition;
      this.midPoint = {x: startPosition.x + (endPosition.x - startPosition.x) / 2,
                       y: startPosition.y + (endPosition.y - startPosition.y) / 2};

      ctx.beginPath();
      ctx.moveTo(this.startPosition.x, this.startPosition.y);
      ctx.lineTo(this.endPosition.x, this.endPosition.y);
      ctx.strokeStyle = colour;
      ctx.stroke();
    }

    function Square(startPosition, size, colour) {
      this.startPosition = startPosition;
      this.width = size;
      this.height = size;
      this.colour = colour;

      this.topLeft = startPosition;
      this.midLeft = {x: this.startPosition.x,
                      y: this.startPosition.y + this.width / 2};
      this.midRight = {x: this.startPosition.x + this.width,
                       y: this.startPosition.y + this.width / 2};
      this.midTop = {x: this.startPosition.x + this.width / 2,
                     y: this.startPosition.y};
      this.midBottom = {x: this.startPosition.x + this.width / 2,
                        y: this.startPosition.y + this.width};
      this.center = {x: this.startPosition.x + this.width / 2,
                     y: this.startPosition.y + this.width / 2};

      ctx.beginPath();
      ctx.rect(this.startPosition.x, this.startPosition.y, this.width, this.height);
      ctx.strokeStyle = this.colour;
      ctx.stroke();
    }

    function Rectangle(startPosition, width, height, colour) {
      this.startPosition = startPosition;
      this.width = width;
      this.height = height;
      this.colour = colour;

      this.topLeft = startPosition;
      this.midLeft = {x: this.startPosition.x,
                      y: this.startPosition.y + this.height / 2};
      this.midRight = {x: this.startPosition.x + this.width,
                       y: this.startPosition.y + this.height / 2};
      this.midTop = {x: this.startPosition.x + this.width / 2,
                     y: this.startPosition.y};
      this.midBottom = {x: this.startPosition.x + this.width / 2,
                        y: this.startPosition.y + this.height};
      this.center = {x: this.startPosition.x + this.width / 2,
                     y: this.startPosition.y + this.height / 2};

      ctx.beginPath();
      ctx.rect(this.startPosition.x, this.startPosition.y, this.width, this.height);
      ctx.strokeStyle = this.colour;
      ctx.stroke();
    }

    function Circle(startPosition, radius, colour) {
      this.startPosition = startPosition;
      this.radius = radius;
      this.colour = colour;

      this.topLeft = {x: this.startPosition.x - this.radius,
                      y: this.startPosition.y - this.radius};
      this.midLeft = {x: this.startPosition.x - this.radius,
                      y: this.startPosition.y};
      this.midRight = {x: this.startPosition.x + this.radius,
                       y: this.startPosition.y};
      this.midTop = {x: this.startPosition.x,
                     y: this.startPosition.y - this.radius};
      this.midBottom = {x: this.startPosition.x,
                        y: this.startPosition.y + this.width};
      this.center = {x: this.startPosition.x,
                     y: this.startPosition.y};

      ctx.beginPath();
      ctx.arc(this.startPosition.x, this.startPosition.y, this.radius, 0, Math.PI * 2, false);
      ctx.strokeStyle = this.colour;
      ctx.stroke();
    }

    function Text(message: string, startPosition, size: string, colour) {
      this.message = message;
      this.startPosition = startPosition;
      this.colour = colour;

      ctx.beginPath();
      ctx.font = size + 'px Arial';
      ctx.strokeStyle = this.colour;
      ctx.fillText(this.message, this.startPosition.x + 5, this.startPosition.y + 4);
    }

    // let animCircle = new Circle(userMidPosition, 30, 'orange');

    // function animate() {
    //   requestAnimationFrame(animate);
    // }

    // animate();
  }
}

