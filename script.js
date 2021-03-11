function removeSpaces(arr)
{
    var i = 0;
    while (i < arr.length)
    {
        if (arr[i] == "")
        {
            arr.splice(i, 1);
        } else
        {
            i++;
        }
    }
}

function checkChar(c)
{
    if (c >= '0' && c <= '9')
    {
        return true;
    }
    if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')
    {
        return true;
    }
    if (c >= 'а' && c <= 'я' || c >= 'А' && c <= 'Я' || c == 'ё' || c == 'Ё')
    {
        return true;
    }
    return false;
}

function validateSet(arr)
{
    removeSpaces(arr);
    if (arr.length == 0)
    {
        document.getElementById("result").innerHTML = "Пропущено поле ввода!";
        return false;
    }
    for (var i = 0; i < arr.length; i++)
    {
        for (var j = 0; j < arr[i].length; j++)
        {
            if (!checkChar(arr[i][j]))
            {
                document.getElementById("result").innerHTML = "Неправильный формат данных!";
                return false;
            }
        }
    }
    for (var i = 0; i < arr.length; i++)
    {
        for (var j = i + 1; j < arr.length; )
        {
            if (arr[j] == arr[i])
            {
                arr.splice(j, 1);
            } else
            {
                j++;
            }
        }
    }   
    return true;
}

function validateRelation(relation, arr1, arr2)
{
    for (var i = 0; i < relation.length; i++)
    {
        if (relation[i].length != 2)
        {
            document.getElementById("result").innerHTML = "Неправильный формат данных!";
            return false;
        }
        for (var j = 0; j < 2; j++)
        {
            for (var k = 0; k < relation[i][j].length; k++)
            {
                if (!checkChar(relation[i][j][k]))
                {
                    document.getElementById("result").innerHTML = "Неправильный формат данных!";
                    return false;
                }
            }
        }        
    }
    for (var i = 0; i < relation.length; i++)
    {
       if (arr1.indexOf(relation[i][0]) == -1 || arr2.indexOf(relation[i][1]) == -1)
        {
            document.getElementById("result").innerHTML = "Неправильный формат данных!";
            return false;
        } 
    }
    for (var i = 0; i < relation.length; i++)
    {
        for (var j = i + 1; j < relation.length; )
        {
            if (relation[j][0] == relation[i][0] && relation[j][1] == relation[i][1])
            {
                relation.splice(j, 1);
            } else
            {
                j++;
            }
        }
    }    
    return true;
}

function define(str1, str2, str3)
{
    var arr1 = str1.split(' ');
    if (!validateSet(arr1))
    {
        return;
    } 
    var arr2 = str2.split(' ');
    if (!validateSet(arr2))
    {
        return;
    }
    var relation = [];
    {
        var temp = str3.split(' ');
        removeSpaces(temp);
        if (temp.length == 0)
        {
            document.getElementById("result").innerHTML = "Пропущено поле ввода!";
            return;
        }        
        for (var i = 0; i < temp.length; i++)
        {
            relation[i] = [];
            relation[i] = temp[i].split(',');
        }
    }    
    if (!validateRelation(relation, arr1, arr2))
    {
        return;
    }
    if (relation.length != arr1.length)
    {
        document.getElementById("result").innerHTML = "Отношение R не является функцией из A в B";
        return;
    }
    for (var i = 0; i < relation.length; i++)
    {
        for (var j = i + 1; j < relation.length; j++)
        {
            if (relation[i][0] == relation[j][0])
            {
                document.getElementById("result").innerHTML = "Отношение R не является функцией из A в B";
                return;
            }
        }
    }
    document.getElementById("result").innerHTML = "Отношение R является функцией из A в B";    
}