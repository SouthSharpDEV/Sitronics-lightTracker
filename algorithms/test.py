from math import atan2, pi
import numpy as np
import pandas as pd
import cv2 as cv
import matplotlib.pyplot as plt
from skimage.filters import threshold_otsu
from skimage.color import rgb2gray
from skimage.morphology import binary_opening, disk
import colorsys
from scipy.spatial import Voronoi, voronoi_plot_2d
from scipy.spatial import Delaunay

class clockwise_angle_and_distance():
    '''
    A class to tell if point is clockwise from origin or not.
    This helps if one wants to use sorted() on a list of points.

    Parameters
    ----------
    point : ndarray or list, like [x, y]. The point "to where" we g0
    self.origin : ndarray or list, like [x, y]. The center around which we go
    refvec : ndarray or list, like [x, y]. The direction of reference

    use: 
        instantiate with an origin, then call the instance during sort
    reference: 
    https://stackoverflow.com/questions/41855695/sorting-list-of-two-dimensional-coordinates-by-clockwise-angle-using-python

    Returns
    -------
    angle
    
    distance
    

    '''
    def __init__(self, origin):
        self.origin = origin

    def __call__(self, point, refvec = [0, 1]):
        if self.origin is None:
            raise NameError("clockwise sorting needs an origin. Please set origin.")
        # Vector between point and the origin: v = p - o
        vector = [point[0]-self.origin[0], point[1]-self.origin[1]]
        # Length of vector: ||v||
        lenvector = np.linalg.norm(vector[0] - vector[1])
        # If length is zero there is no angle
        if lenvector == 0:
            return -pi, 0
        # Normalize vector: v/||v||
        normalized = [vector[0]/lenvector, vector[1]/lenvector]
        dotprod  = normalized[0]*refvec[0] + normalized[1]*refvec[1] # x1*x2 + y1*y2
        diffprod = refvec[1]*normalized[0] - refvec[0]*normalized[1] # x1*y2 - y1*x2
        angle = atan2(diffprod, dotprod)
        # Negative angles represent counter-clockwise angles so we need to 
        # subtract them from 2*pi (360 degrees)
        if angle < 0:
            return 2*pi+angle, lenvector
        # I return first the angle because that's the primary sorting criterium
        # but if two vectors have the same angle then the shorter distance 
        # should come first.
        return angle, lenvector

def hsvToRGB(h, s, v):
    return tuple(round(i * 255) for i in colorsys.hsv_to_rgb(h,s,v))

def rgbToHSV(r, g, b):
    r, g, b = r/255.0, g/255.0, b/255.0
    mx = max(r, g, b)
    mn = min(r, g, b)
    df = mx-mn
    if mx == mn:
        h = 0
    elif mx == r:
        h = (60 * ((g-b)/df) + 360) % 360
    elif mx == g:
        h = (60 * ((b-r)/df) + 120) % 360
    elif mx == b:
        h = (60 * ((r-g)/df) + 240) % 360
    if mx == 0:
        s = 0
    else:
        s = (df/mx)*100
    v = mx*100
    return h, s, v

my_photo1 = plt.imread(r'C:\Users\loinos\Desktop\референсы города освещение\1.jpg')


my_photo = my_photo1.copy()
print( my_photo.shape[0]*my_photo.shape[1])
for i in range(0, my_photo.shape[0]): # We go over rows number 
    for j in range(0, my_photo.shape[1]):
        hc = rgbToHSV(my_photo[i,j][0],my_photo[i,j][1],my_photo[i,j][2])
        hcv = [hc[0],hc[1],hc[2]]
        if ((hcv[0]>310 and hcv[0]<=359) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(0,100,100)
            my_photo[i,j] = [255,0,0]         
        elif ((hcv[0]>270 and hcv[0]<=310) and hcv[1]>25 and hcv[2]>25):
            # hcv1 = colorsys.hsv_to_rgb(290,100,100)
            my_photo[i,j] = [213,0,255]#[hcv1[0],hcv1[1],hcv1[2]]
        elif ((hcv[0]>190 and hcv[0]<=270) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(230,100,100)
            my_photo[i,j] = [0,43,255]#[hcv1[0],hcv1[1],hcv1[2]]
        elif ((hcv[0]>150 and hcv[0]<=190) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(170,100,100)
            my_photo[i,j] = [0,255,213]#[hcv1[0],hcv1[1],hcv1[2]]
        elif ((hcv[0]>80 and hcv[0]<=150) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(125,100,100)
            my_photo[i,j] = [0,255,21]#[hcv1[0],hcv1[1],hcv1[2]]
        elif ((hcv[0]>50 and hcv[0]<=80) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(65,100,100)
            my_photo[i,j] = [235,255,0]#[hcv1[0],hcv1[1],hcv1[2]]
        elif ((hcv[0]>20 and hcv[0]<=50) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(35,100,100)
            my_photo[i,j] = [255,149,0]#[hcv1[0],hcv1[1],hcv1[2]]
        elif ((hcv[0]>0 and hcv[0]<=20) and hcv[1]>25 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(0,100,100)
            my_photo[i,j] = [255,0,0]#[hcv1[0],hcv1[1],hcv1[2]]
        elif (hcv[1]<=40 and hcv[2]>25):
            # hcv1=colorsys.hsv_to_rgb(60,0,60)
            my_photo[i,j] = [255,149,0]#[154,154,154]#[hcv1[0],hcv1[1],hcv1[2]]
        else :#(hcv[2]<=40):
            # hcv1=colorsys.hsv_to_rgb(120,0,0)
            my_photo[i,j] = [0,0,0]#[hcv1[0],hcv1[1],hcv1[2]]


# fig, ax = plt.subplots(1, 2, figsize=(20, 10))
# ax[0].imshow(my_photo1)
# ax[0].set_title('Original image')
# ax[1].imshow(my_photo)
# ax[1].set_title('Dark regions')
# plt.show()


my_photohel = my_photo.copy()


img_grey = cv.cvtColor(my_photohel,cv.COLOR_BGR2GRAY)

#set a thresh
thresh = 100

#get threshold image
ret,thresh_img = cv.threshold(img_grey, thresh, 255, cv.THRESH_TOZERO)

#find contours
contours, hierarchy = cv.findContours(thresh_img, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)

img_contours = np.uint8(np.zeros((my_photohel.shape[0],my_photohel.shape[1])))

cv.drawContours(img_contours, contours, -1, (255,255,255), 1)

points = []

for i in contours:
    M = cv.moments(i)
    if M['m00'] != 0:
        cx = int(M['m10']/M['m00'])
        cy = int(M['m01']/M['m00'])
        points.append((cx,cy))
        cv.circle(my_photohel, (cx, cy), 7, (255, 0, 0), -1)


my_photohel2 = plt.imread(r'C:\Users\loinos\Desktop\референсы города освещение\1.jpg')
# imd = cv.add(my_photo1,fig)




# vor = Voronoi(points)

# fig = voronoi_plot_2d(vor)
# imd = cv.add(my_photo1,fig)
# plt.gca().invert_yaxis()
# plt.imshow(my_photohel2)
# plt.show()

# fig, ax = plt.subplots(1, 2, figsize=(20, 10))
# ax[0].imshow(my_photohel)
# ax[0]
# ax[0].set_title('Original image')
# ax[1].imshow(img_contours)
# ax[1].set_title('Dark regions')
# plt.show()

img = my_photo.copy()
img_gray = cv.cvtColor(img,cv.COLOR_BGR2GRAY)
ret,thresh_img = cv.threshold(img_grey, 100, 255, cv.THRESH_TOZERO)

# размеры картинки
height, width, _ = img.shape

# задание размера квадратной области
N = 30

# разбивка на квадратные области
tiles = [img[x:x+N, y:y+N] for x in range(0, height, N) for y in range(0, width, N)]


#find contours
contours, hierarchy = cv.findContours(thresh_img, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)
points =[]
for count in contours:
    epsilon = 0.01 * cv.arcLength(count, True)
    approximations = cv.approxPolyDP(count, epsilon, True)
    for i1 in approximations:
        for i2 in i1:
            points.append([i2[0],i2[1]])
    
    cv.drawContours(img, [approximations], -1, (255,255,255), 3)
# print (points)
# группировка точек по квадратным областям и нахождение среднего значения
grouped_points = {}
for idx, tile in enumerate(tiles):
    # координаты квадратной области
    x, y = (idx % (width // N)) * N, (idx // (width // N)) * N
    # проверка, входят ли точки в данную квадратную область
    x_sum, y_sum, count = 0, 0, 0
    for point in points:
        if x <= point[0] < x + N and y <= point[1] < y + N:
            # добавление точки в соответствующую группу
            x_sum += point[0]
            y_sum += point[1]
            count += 1
    if count > 0:
        grouped_points[idx] = (x_sum/count, y_sum/count)
# plt.gca().invert_yaxis()
# plt.imshow(img)
# plt.show()
# cv.imshow('img',img)
points = [grouped_points[i] for i in grouped_points]

from scipy.spatial import Delaunay
points2 = np.array(points)
# print(len(points2))
tri = Delaunay(points2)
# print(tri.simplices)
# plt.triplot(points2[:,0], points2[:,1], tri.simplices)
# # plt.plot(points2[:,0], points2[:,1], 'o')
# plt.show()


contours = []
for i in tri.simplices:
    L = [points[i[0]],points[i[1]],points[i[2]]]
    ctr = np.array(L).reshape((-1,1,2)).astype(np.int32)
    contours.append(ctr)
cv.drawContours(my_photohel2,contours,-1,(0,255,0),2)
plt.imshow(my_photohel2)
plt.show()

def insidetriangle(x1,x2,x3,y1,y2,y3):
    import numpy as np
    xs=np.array((x1,x2,x3),dtype=float)
    ys=np.array((y1,y2,y3),dtype=float)

    # The possible range of coordinates that can be returned
    x_range=np.arange(np.min(xs),np.max(xs)+1)
    y_range=np.arange(np.min(ys),np.max(ys)+1)

    # Set the grid of coordinates on which the triangle lies. The centre of the
    # triangle serves as a criterion for what is inside or outside the triangle.
    X,Y=np.meshgrid( x_range,y_range )
    xc=np.mean(xs)
    yc=np.mean(ys)

    # From the array 'triangle', points that lie outside the triangle will be
    # set to 'False'.
    triangle = np.ones(X.shape,dtype=bool)
    for i in range(3):
        ii=(i+1)%3
        if xs[i]==xs[ii]:
            include = X *(xc-xs[i])/abs(xc-xs[i]) > xs[i] *(xc-xs[i])/abs(xc-xs[i])
        else:
            poly=np.poly1d([(ys[ii]-ys[i])/(xs[ii]-xs[i]),ys[i]-xs[i]*(ys[ii]-ys[i])/(xs[ii]-xs[i])])
            include = Y *(yc-poly(xc))/abs(yc-poly(xc)) > poly(X) *(yc-poly(xc))/abs(yc-poly(xc))
        triangle*=include

    # Output: 2 arrays with the x- and y- coordinates of the points inside the
    # triangle.
    ans =[]
    xcords = X[triangle]
    ycords = Y[triangle]
    for i in range(len(xcords)):
        ans.append([int(ycords[i]),int(xcords[i])])

    return ans

br = []
for i in tri.simplices:
    poin = insidetriangle(points[i[0]][0],points[i[1]][0],points[i[2]][0],points[i[0]][1],points[i[1]][1],points[i[2]][1])
    v = 0
    if(len(poin)!=0):
        for point in poin:
            
            hc = rgbToHSV(my_photo[point[0],point[1]][0],my_photo[point[0],point[1]][1],my_photo[point[0],point[1]][2])
            v+=hc[2]
        br.append(int(v/len(poin)))
    else:
        br.append(0)

hel =[]
index =0
for i in tri.neighbors:
    h2 =[index]
    if (abs(br[i[0]] - br[index])<10):
        h2.append(i[0])
    if (abs(br[i[1]] - br[index])<10):
        h2.append(i[1])
    if (abs(br[i[1]] - br[index])<10):
        h2.append(i[1])
    hel.append(h2)
    index+=1


import networkx 
from networkx.algorithms.components.connected import connected_components


def to_graph(hel):
    G = networkx.Graph()
    for part in hel:
        # each sublist is a bunch of nodes
        G.add_nodes_from(part)
        # it also imlies a number of edges:
        G.add_edges_from(to_edges(part))
    return G

def to_edges(hel):
    """ 
        treat `l` as a Graph and returns it's edges 
        to_edges(['a','b','c','d']) -> [(a,b), (b,c),(c,d)]
    """
    it = iter(hel)
    last = next(it)

    for current in it:
        yield last, current
        last = current    

my_photohel3 = plt.imread(r'C:\Users\loinos\Desktop\референсы города освещение\1.jpg')
pp =[]
G = to_graph(hel)
for i in connected_components(G):
    hpp =[]
    brr = 0
    for indsp in i:
        hpp.append(contours[indsp])
        brr = br[indsp]
    
    contours_combined = np.vstack(hpp)
    hull = cv.convexHull(contours_combined)
    cv.drawContours(my_photohel3,[hull],-1,(0,0,255),2)
    moments = cv.moments(hull)
    if moments['m00'] != 0:
        cx = int(moments['m10'] / moments['m00'])
        cy = int(moments['m01'] / moments['m00'])
    my_photohel3 = cv.putText(my_photohel3, str(brr) ,(cx, cy), cv.FONT_HERSHEY_SIMPLEX,1, (255,0,0), 2, cv.LINE_AA)
plt.imshow(my_photohel3)
plt.show()

    # list_of_pts = [] 
    # for ctr in hpp:
    #     list_of_pts += [pt[0] for pt in ctr]
    
    # center_pt = np.array(list_of_pts).mean(axis = 0) # get origin
    # clock_ang_dist = clockwise_angle_and_distance(center_pt) # set origin
    # list_of_pts = sorted(list_of_pts, key=clock_ang_dist)
    # ctr = np.array(list_of_pts).reshape((-1,1,2)).astype(np.int32)
    # print(ctr)
    # print("--------")
    # cv.drawContours(my_photohel2,ctr,-1,(0,0,255),2)
    # plt.imshow(my_photohel2)
    # plt.show()





# contours = []
# for i in tri.simplices:
#     L = [points[i[0]],points[i[1]],points[i[2]]]
#     ctr = np.array(L).reshape((-1,1,2)).astype(np.int32)
#     contours.append(ctr)
# cv.drawContours(my_photohel2,contours,-1,(0,255,0),2)
# plt.imshow(my_photohel2)
# plt.show()

i = 0
for contour in contours:
    # Нахождение координат центра контура
    moments = cv.moments(contour)
    if moments['m00'] != 0:
        cx = int(moments['m10'] / moments['m00'])
        cy = int(moments['m01'] / moments['m00'])
    my_photohel2 = cv.putText(my_photohel2, str(br[i]) ,(cx, cy), cv.FONT_HERSHEY_SIMPLEX,1, (255,0,0), 2, cv.LINE_AA)
    i+=1

plt.imshow(my_photohel2)
plt.show()




